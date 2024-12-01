<script lang="ts">
  // Define the structure of each item in the artistVisits array
  interface ArtistVisit {
    artist_id: number;
    artist_name: string;
    total_visit_duration: number; // in seconds
    unique_session_count: number;
  }

  // ArtistVisits is passed as a prop, explicitly type it
  let { artistVisits }: { artistVisits: ArtistVisit[] } = $props();

  // Sort artistVisits by total_visit_duration (descending)
  artistVisits.sort((a: ArtistVisit, b: ArtistVisit) => b.total_visit_duration - a.total_visit_duration);

  function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 3600); //1 hour = 3600 seconds
    
    // Remaining minutes after removing hours
    const minutes = Math.floor((duration % 3600) / 60); 
    
    const seconds = Math.floor(duration % 60); // Remaining seconds after removing minutes
    
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Format seconds with leading zero if it's less than 10
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    
    // Return the formatted string
    return `${formattedSeconds}:${formattedMinutes}:${hours}`;
  }
</script>

<div class="overflow-x-auto">
  <div class="min-w-max w-[60rem] h-[40rem] overflow-y-auto relative scrollbar-pretty">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Artist Id</th>
          <th scope="col" class="px-6 py-3">Artist Name</th>
          <th scope="col" class="px-6 py-3">Total Interaction Time</th>
          <th scope="col" class="px-6 py-3">Total Unique Visitors</th>
        </tr>
      </thead>
      <tbody>
        {#each artistVisits as { artist_id, artist_name, total_visit_duration, unique_session_count }}
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {artist_id}
            </td>
            <td
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {artist_name}
            </td>
            <td class="px-6 py-4">
              {formatDuration(total_visit_duration)}
            </td>
            <td class="px-6 py-4">
              {unique_session_count}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
/* Custom scrollbar styles */
.scrollbar-pretty::-webkit-scrollbar {
  width: 10px;
}

.scrollbar-pretty::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.scrollbar-pretty::-webkit-scrollbar-thumb {
  background: rgba(149, 158, 160, 0.5);
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.scrollbar-pretty::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 100, 100, 0.7);
}

</style>