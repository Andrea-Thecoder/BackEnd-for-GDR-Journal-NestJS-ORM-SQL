import { JournalPage } from "src/journal-page/entities/journal-page.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class Journal {

    @PrimaryGeneratedColumn({type: "int", unsigned: true}) //AI (auto incrementa)
    id: number;

    @ManyToOne(()=> Users, user => user.journals, {nullable: false,onDelete: 'CASCADE'})
    @JoinColumn({name:"userId", referencedColumnName: "id"})
    user:Users

    @OneToMany(()=> JournalPage, pages => pages.journal, {cascade:true})
    pages:JournalPage[]

    @Column({type: "int", unsigned: true})
    userId:number

    @Column({ type: 'varchar', length: 16 })
    title:string;

    @Column({ type: 'varchar', length: 100 })
    game:string;

    @Column({ type: 'varchar', length: 255 })
    gameUrl:string;

    @CreateDateColumn({ type: 'timestamp'}) 
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date;


}
