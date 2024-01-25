import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Env } from './env.schema'

@Injectable()
export class EnvService {
  constructor(private readonly config: ConfigService<Env, true>) {}

  get<K extends keyof Env>(key: K): Env[K] {
    return this.config.get(key)
  }
}
