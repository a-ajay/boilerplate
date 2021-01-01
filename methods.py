import json
import pandas as pd
import yaml
import re
from datetime import datetime, timedelta
import os


CONFIG = yaml.safe_load(open('config.yaml', "r", encoding='utf-8'))
queries = yaml.safe_load(open('queries.yaml', "r", encoding='utf-8'))


class Methods:

    def __get_engine(self, FormHandler):
        return FormHandler.connect_engine(self)

    def get_meta(self):
        return CONFIG['meta']

    def get_data(self):
        # read csv from data folder
        path = os.path.join("static","data","data.csv")
        df = pd.read_csv(path)
        # return csv JSON
        return df.to_json(orient="records")
