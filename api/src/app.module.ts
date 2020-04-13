/* eslint-disable import/prefer-default-export */
import {Module, CacheModule, CacheInterceptor} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {ServeStaticModule} from '@nestjs/serve-static';
import {APP_INTERCEPTOR} from '@nestjs/core';

import {resolveClientPath} from './services';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolveClientPath(),
      renderPath: '/*',
    }),
    CacheModule.register(),

    CqrsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
