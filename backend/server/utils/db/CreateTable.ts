import db from "~/utils/db/db";

export default function CreateTable(sql: string){
    db.prepare(sql).run()
}