import knex from "knex";
export class Messages {
    constructor(config, table){
        this.db = knex(config);
        this.table = table;
    }
    async save(message){
        try {
                message.timestamp = new Date().toLocaleString()
                await this.db.insert(message).from(this.table)
        } catch (error) {
            console.log(error) 
        }
    }
    async getAll(){
        try {
            const messages = await this.db.from(this.table).select()
            return messages
        } catch (error) {
            console.log(error)            
        }
    }
    async deleteAll(){
        try {
            await this.db.from(this.table).delete()
        } catch (error) {
            console.log(error)            
        }
    }
}