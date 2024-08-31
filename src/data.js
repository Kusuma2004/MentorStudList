// * fake data's
import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    profile: faker.image.avatar(),
    userName: faker.person.firstName(),
    progress: faker.datatype.number(100),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 30,
});