import { Injectable } from '@nestjs/common'
import { helloWorld } from '@reptuo/reputation-algorithms'

@Injectable()
export class AppService {
    getHello(): string {
        console.log(helloWorld('Nest!!!!!'))
        return 'Hello World'
    }
}
