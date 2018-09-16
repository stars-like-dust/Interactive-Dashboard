function buildMetadata(sample) {
   // @TODO: Complete the following function that builds the metadata panel
   d3.json(`/metadata/${sample}`).then((data) => {
  

    // Use `d3.json` to fetch the metadata for a sample
      
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select('#sample-metadata');
      // Use `.html("") to clear any existing metadata
       
        PANEL.html("");
        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(data).forEach(([key, value]) => {
          PANEL.append('h6').text(`${key}:${value}`);
          console.log(key,value);
            // Append a cell to the row for each value
            // in the weather report object
          
          //cell.text(value);
          });
         });

  
}




function buildCharts(sample) {

  d3.json(`/samples/${sample}`).then((data) => { 

    //Start variable section
    var otu_id = data.otu_ids;
    var sample_values = data.sample_values;
    var otu_labels = data.otu_labels;
    //console.log(otu_id, sample_values, otu_labels);

    var poop = otu_id.slice(0,10)
    var turd = sample_values.slice(0,10)
    var farts = otu_labels.slice(0,10)
    console.log(poop, turd, farts)
    //Stop Variable section
  
  //Start bubble section
  //Bubble chart trace
  var bubbleLayout = {
    margin: { t: 0 },
    hovermode: "closest",
    xaxis: { title: "OTU ID" }
  };
  var bubbleData = [
    {
      x: poop,
      y: turd,
      text: farts,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_id,
        colorscale: "Earth"
      }
    }
  ];
  
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  //Stop bubble chart

  //Stop bubble section

  //Start pie chart
  var trace1 = [{
    labels: poop,
    values: turd,
    hovertext: farts,
    type: "pie"
    }];

    var layout = {
      margin: {t:0, l:0}

    

    };

    Plotly.newPlot('pie', trace1, layout);
    //Finish of pie chart
  
  
  })

  
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
