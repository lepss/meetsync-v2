import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tagsName = [
  { name: "tech" },
  { name: "business" },
  { name: "marketing" },
  { name: "design" },
  { name: "development" },
  { name: "programming" },
  { name: "jobs" },
  { name: "education" },
  { name: "travel" },
  { name: "health" },
  { name: "economic" },
  { name: "politics" },
  { name: "sports" },
  { name: "entertainment" },
  { name: "science" },
  { name: "culture" },
  { name: "lifestyle" },
  { name: "food" },
  { name: "fashion" },
  { name: "music" },
  { name: "art" },
  { name: "film" },
];

const main = async () => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    const name = faker.person.fullName();
    const firstname = name.split(" ")[0];
    const lastname = name.split(" ")[1];
    const randomNumber = faker.number.int({ min: 1, max: 100 });
    const username = `${firstname[0]}${lastname}${randomNumber}`;
    const user = {
      name: name,
      firstname: firstname,
      lastname: lastname,
      email: `${firstname[0].toLowerCase()}.${lastname.toLowerCase()}${randomNumber}@gmail.com`,
      image: faker.image.avatar(),
      username: username.toLowerCase(),
      bio: faker.lorem.sentence(),
      link: `${firstname.toLowerCase()}-${lastname.toLowerCase()}.com`,
    } satisfies Prisma.UserCreateInput;

    const dbUser = await prisma.user.create({ data: user });
    users.push(dbUser);

    const companies = [];
    const company = {
      name: faker.company.name(),
      description: faker.company.buzzPhrase(),
      country: faker.location.country(),
      city: faker.location.city(),
      website: faker.internet.url(),
      userId: dbUser.id,
    } satisfies Prisma.CompanyUncheckedCreateInput;
    const dbCompany = await prisma.company.create({ data: company });
    companies.push(company);
  }

  const tags = [];
  for (let i = 0; i < tagsName.length; i++) {
    const tag = {
      name: tagsName[i].name,
    } satisfies Prisma.TagUncheckedCreateInput;

    const dbTag = await prisma.tag.create({ data: tag });
    tags.push(dbTag);
  }

  const events = [];
  for (let i = 0; i < 20; i++) {
    const eventName = faker.company.name();
    const durations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    const event = {
      name: eventName + " Event",
      description:
        eventName +
        " present this event for " +
        faker.lorem.paragraphs({ min: 1, max: 3 }),
      location: faker.location.city(),
      image: faker.image.url(),
      appointment_duration: faker.helpers.arrayElement(durations),
      break_duration: faker.helpers.arrayElement(
        durations.filter((duration) => duration <= 30)
      ),
      userId: users[Math.floor(Math.random() * users.length)].id,
    } satisfies Prisma.EventUncheckedCreateInput;

    const dbEvent = await prisma.event.create({ data: event });
    events.push(dbEvent);

    const numberOfTags = faker.number.int({ min: 1, max: 4 });
    const selectedTagsIndexes = [numberOfTags];
    while (selectedTagsIndexes.length < numberOfTags) {
      const randomIndex = faker.number.int({ min: 0, max: tags.length - 1 });
      selectedTagsIndexes.push(randomIndex);
    }

    for (let i = 0; i < selectedTagsIndexes.length; i++) {
      const index = selectedTagsIndexes[i];
      await prisma.tagRelation.create({
        data: {
          tagId: tags[index].id,
          eventId: dbEvent.id,
        },
      });
    }

    const eventDates = [];
    const randomDateNumber = faker.number.int({ min: 1, max: 3 });
    const baseDate = faker.date.future();
    for (let i = 0; i < randomDateNumber; i++) {
      const eventDate = {
        start_time: new Date(baseDate.setHours(8, 0, 0, 0)),
        end_time: new Date(baseDate.setHours(18, 0, 0, 0)),
        lunch_start_time: new Date(baseDate.setHours(12, 0, 0, 0)),
        lunch_end_time: new Date(baseDate.setHours(13, 0, 0, 0)),
        eventId: dbEvent.id,
      } satisfies Prisma.EventDayUncheckedCreateInput;

      const dbEventDate = await prisma.eventDay.create({ data: eventDate });
      eventDates.push(dbEventDate);
    }

    const appointmentSessions = [];
    const randomSessionNumber = faker.number.int({ min: 2, max: 30 });
    for (let i = 0; i < randomSessionNumber; i++) {
      const sessionUser = users[Math.floor(Math.random() * users.length)];
      const sessionName = faker.company.name();
      const appointmentSession = {
        name: sessionName + " Session",
        description:
          sessionName +
          ` organize this session in ${eventName} event for ` +
          faker.lorem.paragraphs({ min: 1, max: 3 }),
        image: faker.image.url(),
        userId: sessionUser.id,
        eventId: dbEvent.id,
      } satisfies Prisma.AppointmentSessionUncheckedCreateInput;

      const dbAppointmentSession = await prisma.appointmentSession.create({
        data: appointmentSession,
      });
      appointmentSessions.push(dbAppointmentSession);

      const appointmentRequests = [];
      const randomRequestNumber = faker.number.int({ min: 2, max: 15 });
      for (let j = 0; j < randomRequestNumber; j++) {
        const filteredUsers = users.filter(
          (user) => user.id !== sessionUser.id
        );
        const requestUser =
          filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
        const appointmentRequest = {
          request: faker.lorem.sentence(),
          userId: requestUser.id,
          appointmentSessionId: dbAppointmentSession.id,
        } satisfies Prisma.AppointmentRequestUncheckedCreateInput;

        const dbAppointmentRequest = await prisma.appointmentRequest.create({
          data: appointmentRequest,
        });
        appointmentRequests.push(dbAppointmentRequest);
      }
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect;
    process.exit(1);
  });
