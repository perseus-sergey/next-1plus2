export const wordList = [
  { word: 'astronomy', hint: 'The scientific study of celestial objects and phenomena.' },
  { word: 'football', hint: 'A popular sport played with a spherical ball.' },
  { word: 'chocolate', hint: 'A sweet treat made from cocoa beans.' },
  { word: 'butterfly', hint: 'An insect with colorful wings and a slender body.' },
  { word: 'history', hint: 'The study of past events and human civilization.' },
  { word: 'pizza', hint: 'A savory dish consisting of a round, flattened base with toppings.' },
  { word: 'jazz', hint: 'A genre of music characterized by improvisation and syncopation.' },
  { word: 'camera', hint: 'A device used to capture and record images or videos.' },
  { word: 'diamond', hint: 'A precious gemstone known for its brilliance and hardness.' },
  { word: 'adventure', hint: 'An exciting or daring experience.' },
  {
    word: 'science',
    hint: 'The systematic study of the structure and behavior of the physical and natural world.',
  },
  { word: 'bicycle', hint: 'A human-powered vehicle with two wheels.' },
  { word: 'sunset', hint: 'The daily disappearance of the sun below the horizon.' },
  { word: 'coffee', hint: 'A popular caffeinated beverage made from roasted coffee beans.' },
  { word: 'dance', hint: 'A rhythmic movement of the body often performed to music.' },
  { word: 'galaxy', hint: 'A vast system of stars, gas, and dust held together by gravity.' },
  { word: 'orchestra', hint: 'A large ensemble of musicians playing various instruments.' },
  {
    word: 'volcano',
    hint: 'A mountain or hill with a vent through which lava, rock fragments, hot vapour, and gas are ejected.',
  },
  { word: 'novel', hint: 'A long work of fiction, typically with a complex plot and characters.' },
  {
    word: 'sculpture',
    hint: 'A three-dimensional art form created by shaping or combining materials.',
  },
  {
    word: 'symphony',
    hint: 'A long musical composition for a full orchestra, typically in multiple movements.',
  },
  { word: 'architecture', hint: 'The art and science of designing and constructing buildings.' },
  {
    word: 'ballet',
    hint: 'A classical dance form characterized by precise and graceful movements.',
  },
  { word: 'astronaut', hint: 'A person trained to travel and work in space.' },
  { word: 'waterfall', hint: 'A cascade of water falling from a height.' },
  { word: 'technology', hint: 'The application of scientific knowledge for practical purposes.' },
  {
    word: 'rainbow',
    hint: 'A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light.',
  },
  { word: 'universe', hint: 'All existing matter, space, and time as a whole.' },
  {
    word: 'piano',
    hint: 'A musical instrument played by pressing keys that cause hammers to strike strings.',
  },
  { word: 'vacation', hint: 'A period of time devoted to pleasure, rest, or relaxation.' },
  { word: 'rainforest', hint: 'A dense forest characterized by high rainfall and biodiversity.' },
];

const wordListDB = [
  ['astronomy', 'The scientific study of celestial objects and phenomena.'],
  ['football', 'A popular sport played with a spherical ball.'],
  ['chocolate', 'A sweet treat made from cocoa beans.'],
  ['butterfly', 'An insect with colorful wings and a slender body.'],
  ['history', 'The study of past events and human civilization.'],
  ['pizza', 'A savory dish consisting of a round, flattened base with toppings.'],
  ['jazz', 'A genre of music characterized by improvisation and syncopation.'],
  ['camera', 'A device used to capture and record images or videos.'],
  ['diamond', 'A precious gemstone known for its brilliance and hardness.'],
  ['adventure', 'An exciting or daring experience.'],
  [
    'science',
    'The systematic study of the structure and behavior of the physical and natural world.',
  ],
  ['bicycle', 'A human-powered vehicle with two wheels.'],
  ['sunset', 'The daily disappearance of the sun below the horizon.'],
  ['coffee', 'A popular caffeinated beverage made from roasted coffee beans.'],
  ['dance', 'A rhythmic movement of the body often performed to music.'],
  ['galaxy', 'A vast system of stars, gas, and dust held together by gravity.'],
  ['orchestra', 'A large ensemble of musicians playing various instruments.'],
  [
    'volcano',
    'A mountain or hill with a vent through which lava, rock fragments, hot vapour, and gas are ejected.',
  ],
  ['novel', 'A long work of fiction, typically with a complex plot and characters.'],
  ['sculpture', 'A three-dimensional art form created by shaping or combining materials.'],
  ['symphony', 'A long musical composition for a full orchestra, typically in multiple movements.'],
  ['architecture', 'The art and science of designing and constructing buildings.'],
  ['ballet', 'A classical dance form characterized by precise and graceful movements.'],
  ['astronaut', 'A person trained to travel and work in space.'],
  ['waterfall', 'A cascade of water falling from a height.'],
  ['technology', 'The application of scientific knowledge for practical purposes.'],
  [
    'rainbow',
    'A meteorological phenomenon that is caused by reflection, refraction, and dispersion of light.',
  ],
  ['universe', 'All existing matter, space, and time as a whole.'],
  ['piano', 'A musical instrument played by pressing keys that cause hammers to strike strings.'],
  ['vacation', 'A period of time devoted to pleasure, rest, or relaxation.'],
  ['rainforest', 'A dense forest characterized by high rainfall and biodiversity.'],
];

const createTableQuery = `
CREATE TABLE IF NOT EXISTS words (
  id SERIAL PRIMARY KEY,
  word VARCHAR(255) NOT NULL,
  hint TEXT NOT NULL
)`;

const setupDatabase = async () => {
  try {
    await connection.query(createTableQuery);

    const insertQuery = 'INSERT INTO words (word, hint) VALUES ?';

    await connection.query(insertQuery, [wordListDB]);

    const [rows] = await connection.query('SELECT * FROM words');
    console.log('Data fetched successfully:', rows);
  } catch (err) {
    console.error('Error with database setup:', err);
  } finally {
    await connection.end();
  }
};

export default setupDatabase;
