import { ExecutionContext, createParamDecorator } from "@nestjs/common";


export const User = createParamDecorator((data, ctx: ExecutionContext) => {
    const arg = ctx?.getArgs()
    const type = ctx?.getType()
    const user = type === 'http' ? arg[0]?.user : arg[2]?.req?.user
    return user
})