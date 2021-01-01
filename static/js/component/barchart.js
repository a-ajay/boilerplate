
function plot_bar(config) {

    let selector = config.selector || "body",
        margin = config.margin || { top: 0, right: 50, bottom: 20, left: 50 },
        width = config.width || $(selector).width(),
        height = config.height || $(selector).height(),
        data = config.data


    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    $(selector).empty()
    var svg = d3.selectAll(selector)
        .append("svg")
        .attr("viewBox", `0 0 ${(width + margin.left + margin.right)} ${(height + margin.top + margin.bottom)}`)
        .attr("width", "100%")
        .attr("height", "100%")
        // .attr("preserveAspectRatio", "xMidYMid keep")
        // .attr("preserveAspectRatio", "none")
        .append("g")
        .attr("transform", `translate(${margin.left} , ${margin.top})`);


    data.map((d) => {
        d.frequency = +d.frequency;
        return d;
    });


    x.domain(data.map(function (d) { return d.letter; }));
    y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data).enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.letter); })
        .attr("y", function (d) { return y(d.frequency); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.frequency); })
        .style("fill", "steelblue")
        .on("mouseover", function(){
            d3.select(this).style("fill","brown")
        })
        .on("mouseout", function(){
            d3.select(this).style("fill","steelblue")
        })



}