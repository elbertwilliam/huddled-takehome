import type { PageServerLoad } from "./$types";
//server-side data
export const load: PageServerLoad = async ({ locals }) => {
  const db = locals.db;
  //SQL Query
  const query = `
  SELECT
  ue.artist_id,
  strftime('%H', datetime((ue.created_at / 1000) + (COALESCE(u.timezone, 0) * 3600), 'unixepoch')) AS hour_of_day,
  COUNT(*) AS event_count,
  SUM(
    CASE
      WHEN ue.event_type = 'like_track' THEN 2
      WHEN ue.event_type = 'add_track_to_playlist' THEN 2
      WHEN ue.event_type = 'play_track' THEN 1
      WHEN ue.event_type = 'share_track' THEN 3
      ELSE 0
    END
  ) AS engagement_score
FROM 
  user_events ue
JOIN 
  users u ON ue.user_id = u.id
WHERE 
  ue.event_type IN ('like_track', 'add_track_to_playlist', 'play_track', 'share_track')
GROUP BY 
  ue.artist_id, hour_of_day
HAVING 
  engagement_score > 0
ORDER BY 
  ue.artist_id, hour_of_day;


`;
//execution
  const data = await db.prepare(query).all();
  

  return {
    artistEngagements: data,
  };
};
