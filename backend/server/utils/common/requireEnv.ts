export default function requireEnv(key: string): string{
    const env = process.env[key]
    if(!env){
        throw new Error(`Variável de ambiente ${key} não foi definida`)
    }

    return env;
}