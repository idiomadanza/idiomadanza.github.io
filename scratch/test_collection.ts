import { getCollection } from 'astro:content';

async function test() {
  try {
    const team = await getCollection('team');
    console.log('Team count:', team.length);
    if (team.length > 0) {
      console.log('First entry:', JSON.stringify(team[0], null, 2));
    } else {
      console.log('Collection is empty');
    }
  } catch (e) {
    console.error('Error fetching collection:', e);
  }
}

test();
