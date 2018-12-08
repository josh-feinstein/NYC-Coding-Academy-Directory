const { db } = require('./server/db')
const Students = require('./server/db/models/students');
const Campuses = require('./server/db/models/campuses');

const students = [
  {
    firstName: 'Josh',
    lastName: 'Feinstein',
    email: 'josh@gmail.com',
    gpa: 3.8,
    campusId: 2,
    imageUrl: '/images/josh.jpg'
  },
  {
    firstName: 'Rui',
    lastName: 'Zhao',
    email: 'rui@yahoo.com',
    gpa: 3.9,
    campusId: 1,
    imageUrl: '/images/rui.jpg'

  },
  {
    firstName: 'Barry',
    lastName: 'Huang',
    email: 'barry@gmail.com',
    gpa: 3.7,
    campusId: 4,
    imageUrl: '/images/barry.jpg'

  },
  {
    firstName: 'Danielle',
    lastName: 'McCarthy',
    email: 'danielle@yahoo.com',
    gpa: 4.0,
    campusId: 3,
    imageUrl: '/images/danielle.jpg'

  },
  {
    firstName: 'Eric',
    lastName: 'Feinstein',
    email: 'eric@hotmail.com',
    gpa: 0.0,
    imageUrl: '/images/eric.jpg'

  },
]

const campuses = [
  {
    name: 'Fullstack Academy of Code',
    address: '5 Hanover Square floor 11, New York, NY 10004',
    description: 'Fullstack Academy is an immersive software engineering coding bootcamp located in New York City and Chicago. Students of the full-time flagship course learn full stack JavaScript over the course of a 13-week, on-campus program. Fullstack Academy offers beginner courses in Javascript (JavaScript Jumpstart) and front-end development, as well as a summer program for college-age students (Summer of Code), and a part-time version of their full-time curriculum.',
    imageUrl: '/images/fullstack.png'
  },
  {
    name: 'Hack Reactor',
    address: '303 Spring St, New York, NY 10013',
    description: 'Hack Reactor is a software engineering Coding Bootcampeducation program founded in San Francisco by Anthony Phillips, Shawn Drost, Marcus Phillips, and Douglas Calhoun in 2012. Their coding bootcamp is currently offered in 12-week Full-Time and 9-month Part-Time formats, in-person in San Francisco, Los Angeles, New York City and Austin, as well as remotely, live online.',
    imageUrl: '/images/hackreactor.png'
  },
  {
    name: 'Codesmith',
    address: '250 Lafayette Street, 2nd Floor, New York, NY 10012',
    description: 'The heart of Codesmith is theSoftware Engineering Immersive, a 12-week program in Los Angeles and New York City where engineers build compelling open-source projects and develop expertise in computer science, fullstack JavaScript and machine learning.',
    imageUrl: '/images/codesmith.png'
  },
  {
    name: 'App Academy',
    address: '22 W 38th St, New York, NY 10018',
    description: 'Introduced in 2012, App Academy’s "job-guaranteed" financing model demonstrates a tuition-free structure that promises individuals a career at the conclusion of the program. App Academy’s model "reverses the traditional incentive structure for higher education"; this has received media attention and was described by Wired as "flipping the script on student loans". 93% of App Academy’s first cohort found jobs, paying an average salary of $83,000. If a student does not find a career within the first year of graduation, the individual is not charged for tuition. Currently, 98% of App Academy graduates find jobs, with an average salary of $105,000 in San Francisco and $89,000 in New York City. Since the establishment of App Academy, over 700 graduates have been placed at tech companies such as Google, Facebook, Pinterest, Cisco, and more.',
    imageUrl: '/images/appacademy.png'
  },
]


const seed = () =>
  Promise.all(campuses.map(campus =>
    Campuses.create(campus))
  )
    .then(() =>
      Promise.all(students.map(student =>
        Students.create(student))
      ))
    .catch(err => {
      console.log('Danger Will Robinson, danger! Error while seeding');
      console.log(err.stack);
    });

const main = () => {
  console.log('Database sync, initiated.');
  db.sync({ force: true })
    .then(() => {
      console.log('Database seeding complete.');
      return seed();
    })
    .catch(err => {
      console.log('Danger Will Robinson, danger! Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
