export const assignRandom = (servers) => {
  if (!servers || servers.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * servers.length);
  return servers[randomIndex].id;
};

export const roundRobin = (servers, currentIndex) => {
  if (!servers || servers.length === 0) return { id: null, nextIndex: 0 };
  const nextIndex = (currentIndex + 1) % servers.length;
  return { id: servers[currentIndex].id, nextIndex };
};

export const getRequests = (hour, dataset, spikes) => {
  // Find base requests for the given hour
  const dataPoint = dataset.find((d) => d.hour === hour);
  let requests = dataPoint ? dataPoint.requests : 0;

  // Check if there's an active spike
  const activeSpike = spikes.find((s) => s.hour === hour);
  if (activeSpike) {
    requests *= activeSpike.multiplier;
  }

  // To make it look dynamic per second, divide by a factor, e.g., 60,
  // since 1 simulation tick = 1 "minute" or something similar if hour progresses,
  // actually, let's say the requests returned are "per second" for this hour visualization.
  // The dataset is total per hour, so let's divide by 60 to simulate a smaller chunk per tick,
  // or just return the raw number if the simulation is fast. Let's return raw for visual impact.
  return requests;
};
