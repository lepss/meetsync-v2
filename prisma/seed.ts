import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    const name = faker.person.fullName();
    const user = {
      name: name,
      firstname: name.split(" ")[0],
      lastname: name.split(" ")[1],
      email: faker.internet.email(),
      image: faker.image.avatar(),
      username: faker.internet.userName(),
      bio: faker.lorem.sentence(),
      link: faker.internet.url(),
    } satisfies Prisma.UserCreateInput;

    const dbUser = await prisma.user.create({ data: user });
    users.push(dbUser);
  }

  const events = [];
  for (let i = 0; i < 20; i++) {
    const event = {
      name: faker.lorem.words(),
      description: faker.lorem.sentence(),
      location: faker.location.city(),
      image: faker.image.url(),
      appointment_duration: faker.number.int({ min: 15, max: 60 }),
      break_duration: faker.number.int({ min: 5, max: 30 }),
      userId: users[Math.floor(Math.random() * users.length)].id,
    } satisfies Prisma.EventUncheckedCreateInput;

    const dbEvent = await prisma.event.create({ data: event });
    events.push(dbEvent);

    const eventDates = [];
    const randomDateNumber = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < randomDateNumber; i++) {
      const baseDate = faker.date.future();
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
      const appointmentSession = {
        description: faker.lorem.sentence(),
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
