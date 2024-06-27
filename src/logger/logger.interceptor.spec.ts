import { LoggingInterceptor } from './logger.interceptor';

describe('LoggerInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggingInterceptor()).toBeDefined();
  });
});
