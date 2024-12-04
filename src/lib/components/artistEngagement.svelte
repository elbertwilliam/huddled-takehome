<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Chart from "chart.js/auto";
  
    export let artistEngagements: Array<{
      artist_id: number;
      hour_of_day: string;
      engagement_score: number;
    }> = [];
  
    let chart: Chart | null = null;
  
    onMount(() => {
      if (!artistEngagements || artistEngagements.length === 0) {
        console.error("Artist Engagement Data is empty or undefined:", artistEngagements); //Checks if artistEngagements has data.
        return;
      }
  
      console.log("Artist Engagement Data:", artistEngagements);
  
      // Extract unique artist IDs for chart data
      const artistIds = [...new Set(artistEngagements.map(e => e.artist_id))];
  
      // Prepare data for the chart, showing only peak engagement score per artist
      const chartData = artistIds.map(artistId => {
        const artistData = artistEngagements.filter(e => e.artist_id === artistId);
        let maxScore = 0;
        let peakHour = 0;
  
        // Find the hour with the maximum engagement score
        artistData.forEach(data => {
          if (data.engagement_score > maxScore) {
            maxScore = data.engagement_score;
            peakHour = parseInt(data.hour_of_day, 10);
          }
        });
  
        // Prepare the data for the chart
        const scores = Array(24).fill(0);
        if (peakHour >= 0 && peakHour < 24) {
          scores[peakHour] = maxScore;
        }
  
        return {
          label: `Artist ${artistId}`,
          data: scores,
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for each artist
          borderWidth: 1,
          fill: false,
        };
      });
      // Chart Initialization
      const ctx = document.getElementById("engagementChart") as HTMLCanvasElement | null;
      if (ctx) {
        chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`), // Hour labels
            datasets: chartData,
          },
          options: {
            responsive: true,
            scales: {
              x: {
                title: { display: true, text: "Hour of the Day" },
              },
              y: {
                title: { display: true, text: "Engagement Score" },
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        console.error("Canvas element not found");
      }
    });
    // onDestroy Lifecycle Function
    onDestroy(() => {
      if (chart) {
        chart.destroy(); // Properly clean up the chart instance
        chart = null;
      }
    });
  </script>
  
  <canvas id="engagementChart" width="800" height="300"></canvas>
  