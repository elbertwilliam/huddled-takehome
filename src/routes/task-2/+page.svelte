<script lang="ts">
    import type { PageData } from "./$types";
    import ArtistEngagement from "$lib/components/artistEngagement.svelte"; // Import your component
    //client-side code
    let { data }: { data: PageData } = $props();
  </script>
  
  <!-- Render the ArtistTable component and pass the data -->
   <div class="flex flex-col justify-center items-center w-full h-[80%] overflow-hidden">
    <!-- artistEngagements prop is passed and pulled specific data from data-->
  <ArtistEngagement artistEngagements={data.artistEngagements} />
</div>
  