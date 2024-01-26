import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export class SignInDto extends createZodDto(signInSchema) {}
