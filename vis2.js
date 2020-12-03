// CREATE VALUES
const margin = {top: 10, right: 50, bottom: 120, left: 50};
const width = 800 - margin.left - margin.right;
const height = 570 - margin.top - margin.bottom;

// LOAD SVG
var svg = d3.select("body").append("svg")
                           .attr("width", width + margin.left + margin.right)
                           .attr("height", height + margin.top + margin.bottom)
                           .append("g")
                           .attr("transform", `translate(${margin.left},${margin.top})`);
                           svg
                           .append('rect')
                           .style("fill", "black")
                           .style("pointer-events", "all")
                           .attr('width', width + 100)
                           .attr('opacity', "0.1")
                           .attr('height', height)
 
// LOAD WHEN PAGE OPENS
document.addEventListener('DOMContentLoaded', function() 
{
  // GRAB DATA
  d3.csv("data/age.csv").then(data => 
  {

      // ASSIGN TYPES
      data.forEach(function(d) 
      {
        d.Value = d.Value;
        d.TimePeriod = +d.TimePeriod; 
        
      });

      // GRAB INPUT VALUE
      var age = document.getElementById("ageInput").value;

      // FILTER TO THE INPUT
      var dataFilter = data.filter(function(d){return (d.Subgroup == age)})


      // CREATE THE AXIS 
      var x = d3.scaleLinear()
        .domain([18, 1])
        .range([ height + 400, 0]);
      // EDIT THE TICKS
      let xAxisGenerator = d3.axisBottom(x);
      xAxisGenerator.ticks(18);
      let tickLabels = ['Oct 28 to Nov 9','Oct 14 to Oct 26','Sep 30 to Oct 12','Sep 16 to Sep 28','Sep 2 to Sep 14','Aug 19 to Aug 31','July 16 to July 21','July 9 to July 14','July 2 to July 7','June 25 to June 30','June 18 to June 23','June 11 to June 16','June 4 to June 9','May 28 to June 2','May 21 to May 26','May 14 to May 19','May 7 to May 12','Apr 23 to May 5'];
      xAxisGenerator.tickFormat((d,i) => tickLabels[i]);

      // ADD THE TICKS
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxisGenerator)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.9em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)" );

      // MAX VALUE
      const max = d3.max(dataFilter, function(d) { return +d.Value; })
      // BISECT
      var bisect = d3.bisector(function(d) { return d.TimePeriod; }).left;
      console.log(bisect)
      // SET Y AXIS
      var y = d3.scaleLinear()
          .domain([0,(max + 5)])
          .range([ height, 0]);
      svg.append("g")
          .call(d3.axisLeft(y)); 

      console.log(max)

      // CONFIDENCE INTERVAL
      var CI = svg.append("path")
      .datum(dataFilter)
      .attr("fill", "#4C1A57")
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(function(d) { return x(d.TimePeriod) })
        .y0(function(d) { return y(d.HighCI) })
        .y1(function(d) { return y(d.LowCI) })
        )
      .attr("opacity", ".4")
      // ADD THE LINE
      var line = svg.append("path")
        .datum(dataFilter)
        .attr("fill", "none")
        .attr("stroke", "#E63462")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) 
        { 
          console.log(d)
            return x(d.TimePeriod) 
        })
          .y(function(d) { return y(d.Value) })
        )
      // ADD CURSOR
        // Create the circle that travels along the curve of chart
      var focus = svg
        .append('g')
        .append('circle')
          .style("fill", "none")
          .attr("stroke", "#7FB7BE")
          .attr("stroke-width", 2.5)
          .attr('r', 3.5)
          .style("opacity", 0)

    // Create the text that travels along the curve of chart
        var focusText = svg
          .append('g')
          .append('text')
          .style("opacity", 0)
          .style("fill", "Black")
          .style("font-weight", "bolder")
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")

        svg
          .append('rect')
          .style("fill", "none")
          .style("pointer-events", "all")
          .attr('width', width)
          .attr('height', height)
          .on('mouseover', mouseover)
          .on('mousemove', mousemove)
          .on('mouseout', mouseout);
            // What happens when the mouse move -> show the annotations at the right positions.
      function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
      }

      function mousemove() 
      {
        // recover coordinate we need
        var x0 = x.invert(d3.mouse(this)[0]);
        // console.log(x0)
        var i = bisect(dataFilter, x0, 1);
        selectedData = dataFilter[i]
        focus
          .attr("cx", x(selectedData.TimePeriod))
          .attr("cy", y(selectedData.Value))
        focusText
          .html(selectedData.Value + "%")
          .attr("x", x(selectedData.TimePeriod))
          .attr("y", y(selectedData.Value) + 20)
      }
      function mouseout() 
      {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
      }
      // X LABEL 
      svg.append("text")
      .attr("x", width / 2)
      .attr("y",  margin.bottom + 430 )
      .style("text-anchor", "middle")
      .style("font-weight", "bolder")
      .attr("textLength", "210")
      .attr("lengthAdjust", "spacingAndGlyphs")
      .text("Time Period of Pandemic April to October");

      // Y AXIS LABELS
      var people = svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-weight", "lighter")
          .attr("textLength", "350")
          .attr("lengthAdjust", "spacingAndGlyphs")
          .text("Percent (%) of People who experienced Anxiety/Depression");

      // ADD TITLE
      svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", 20 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "14px") 
          .style("text-decoration", "underline")  
          .style("font-weight", "bolder")
          .text("Time Period of Pandemic April to October vs People who experienced Anxiety or Depression(%)");

    function update(age) 
    {

      dataFilter = data.filter(function(d){return d.Subgroup==age})

      CI
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("fill", "#4C1A57")
        .attr("stroke", "none")
        .attr("d", d3.area()
          .x(function(d) { return x(d.TimePeriod) })
          .y0(function(d) { return y(d.HighCI) })
          .y1(function(d) { return y(d.LowCI) })
          )
      line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("fill", "none")
        .attr("stroke", "#E63462")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) 
        { 
          console.log(d)
            return x(d.TimePeriod) 
        })
          .y(function(d) { return y(d.Value) })
        )
      people
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-weight", "lighter")
          .attr("textLength", "400")
          .attr("lengthAdjust", "spacingAndGlyphs")
          .text("Percent (%) of People who experienced Anxiety/Depression (" + age + ")");

    }

    d3.select("#ageInput").on("change", function(d) 
    {
        var selectedOption = d3.select(this).property("value")
        update(selectedOption)
    })
  });
});
function convert(d)
{
    console.log("Change the Data")
    d.value = +d.value;
    d.TimePeriod = +d.TimePeriod;
    
    return d;
}