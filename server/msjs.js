const fs = require("fs")
class ContMsjs {
    constructor(archiveName){
        this.archiveName = archiveName,
        this.data = []
    }
    async save (mensaje){
        try{
            this.data = await this.getAll()
            if (this.data.length !== 0){  
                mensaje.timestamp = new Date().toLocaleString()
                this.data.push(mensaje)
                fs.promises.writeFile(this.archiveName,JSON.stringify(this.data,null,2))}
            else{
                return 
            }
        }catch(error){
            console.log(`Error en escritura: ${error}`)
        }
    }
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archiveName,"utf-8")
            return JSON.parse(data)
        }catch(error){
            return (`Error en lectura: ${error}`)
        }
    }
    async deleteAll(){
        await fs.promises.unlink(this.archiveName)
    }
}
module.exports = ContMsjs