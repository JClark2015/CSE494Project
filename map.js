      
      google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['State', 'Select'],
          ['Alabama', 43.8],
          ['Alaska', 44.6],
          ['Arkansas', 44.2],
          ['Colorado', 45.8],
          ['Arizona', 43.8],
          ['California', 45.1],
          ['Deleware', 35.9],
          ['Florida', 41.3],
          ['Hawaii', 32.1],
          ['Kansas', 40],
          ['Kentucky', 38.9],
          ['Michigan', 40.7],
          ['Montana', 45.3],
          ['Massachusetts', 42.1],
          ['Nevada', 47.6],
          ['Nebraska', 39.6],
          ['New Jersey', 40.9],
          ['New Mexico', 37.6],
          ['New York', 29.3],
          ['Oregon', 36.4],
          ['North Dakota', 26.8],
          ['Texas', 32.4],
          ['Utah', 28.5],
          ['Virginia', 27],
          ['Washington', 32.2],
          ['Idaho', 40.5],
          ['Wyoming', 31.6],
          ['South Dakota', 27.6],
          ['Minnesota', 24.2],
          ['Iowa', 25.3],
          ['Oklahoma', 33.3],
          ['Missouri', 24.8],
          ['Louisiana', 46.8],
          ['Mississippi', 36.5],
          ['Georgia', 39.6],
          ['South Carolina', 32.3],
          ['North Carolina', 30.5],
          ['Wisconsin', 23.9],
          ['Illinois', 42.6],
          ['Ohio', 24.9],
          ['Indiana', 39.5],
          ['Pennsylvania', 39.9],
          ['Maine', 40.9],
          ['New Hampshire', 40.1],
          ['Vermont', 39.8],
          ['Tennessee', 42.7],
          ['West Virginia', 42.6],
          ['Rhode Island', 44.5],
          ['Maryland', 40.3],
          ['Delaware', 35.9],
          ['Connecticut', 37.5],
          
        ]);

        var options = {
            region: 'US',
            displayMode: 'regions',
            resolution: 'provinces',
        };

        //function drawRegionsMap() {


        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);

            function myClickHandler(){
                var selection = chart.getSelection();
                var message = '';
                for (var i = 0; i < selection.length; i++) {
                    var item = selection[i];
                    if (item.regions != null && item.column != null) {
                        message += '{row:' + item.row + ',column:' + item.column + '}';
                    } else if (item.row != null) {
                        message += '{row:' + item.regions_div + '}';
                    } else if (item.column != null) {
                        message += '{column:' + item.column + '}';
                    }
                }
                    if (message == '') {
                        message = 'nothing';
                    }
                    alert('You selected ' + message);
            }
            google.visualization.events.addListener(chart, 'regionClick', myClickHandler);
            //google.visualization.events.trigger(chart, 'regionClick', { region:'US' });

    google.load('visualization', '1', {packages: ['geochart'], callback: drawMap});

      }