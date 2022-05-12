import knex from "knex"
export class Products {
    constructor(config, table){
        this.db = knex(config)
        this.table = table
    }
    async save(product){
        try {
            let exist = await this.db.from(this.table).select().where('name', product.name)
            if(exist.length === 0){
                let time = new Date().toLocaleString()
                product.timestamp = time
                await this.db.insert(product).from(this.table)
            }else{
                await this.db.from(this.table).increment('stock',product.stock).where('name',product.name)
            }
        } catch (error) {
            console.log(error) 
        }
    }
    async getAll(){
        try {
            const productos = await this.db.select().from(this.table).select()
            return productos
        } catch (error) {
            console.log(error)            
        }
    }
    async getById(id){
        try {
            const findById = await this.db.select().from(this.table).select().where("id",id)
            return findById
        } catch (error) {
            console.log(error)            
        }
    }
    async updateById(id, newValue){
        try {
            const { name, thumbnail, price, stock, description, codebar } = newValue
            if(name){
                await this.db.from(this.table).update({name}).where('id',id)
            }
            if(thumbnail){
                await this.db.from(this.table).update({thumbnail}).where('id',id)
            }
            if(price){
                await this.db.from(this.table).update({price}).where('id',id)
            }
            if(stock){
                await this.db.from(this.table).update({stock}).where('id',id)
            }
            if(description){
                await this.db.from(this.table).update({description}).where('id',id)
            }
            if(codebar){
                await this.db.from(this.table).update({codebar}).where('id',id)
            }
        } catch (error) {
            console.log(error)            
        }
    }
    async deleteById(id){
        try {
            await this.db.from(this.table).del().where('id',id)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteAll(){
        try {
            await this.db.from(this.table).del()
        } catch (error) {
            console.log(error)
        }
    }
}