import { Journal } from "src/journal/entities/journal.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class JournalPage {

    @PrimaryGeneratedColumn({type: "int", unsigned: true}) //AI (auto incrementa)
    id: number;

    @ManyToOne(()=> Journal, journal => journal.pages, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name:"journalId", referencedColumnName: "id"})
    journal:Journal;

    @Column({type: "int", unsigned: true})
    journalId:number;

    @Column({type:"text"})
    text:string;

    @CreateDateColumn({ type: 'timestamp'}) 
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;

}
