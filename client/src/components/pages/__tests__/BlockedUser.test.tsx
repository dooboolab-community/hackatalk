import {MockPayloadGenerator, createMockEnvironment} from 'relay-test-utils';

import BlockedUser from '../BlockedUser';
import {createTestElement} from '../../../../test/testUtils';
import {render} from '@testing-library/react-native';

const mockEnvironment = createMockEnvironment();

mockEnvironment.mock.queueOperationResolver((operation) =>
  MockPayloadGenerator.generate(operation),
);

describe('Rendering', () => {
  it('renders without crashing', async () => {
    const component = createTestElement(<BlockedUser />, {
      environment: mockEnvironment,
    });

    const screen = render(component);
    const json = screen.toJSON();

    expect(json).toBeTruthy();
  });
});
