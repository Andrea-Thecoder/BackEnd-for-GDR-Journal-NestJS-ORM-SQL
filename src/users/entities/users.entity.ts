
import { Journal } from 'src/journal/entities/journal.entity';
import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';


@Entity()
@Unique(["email"])
export class Users {

    @PrimaryGeneratedColumn({type: "int", unsigned: true}) //AI (auto incrementa)
    id: number;

    
    //relazione 1:1. Primo params, fn anonima dove specifichiamo il nome della seconda entità. param 2: key assegnata ad OneTone è il params => params.<nome key dell'altra tabella>. In questo modo sono collegate.
    @OneToOne(()=>UserProfile, profile => profile.users,{ cascade: true })
    profile:UserProfile

    @OneToMany(()=> Journal, journals => journals.user, {cascade:true})
    journals:Journal[]

    @Column({ type: 'varchar', length: 100 })
    nickname:string;

    @Column({ type: 'varchar', length: 100 })
    email:string;

    @Column({ type: 'char', length: 60 })
    password:string;

    @CreateDateColumn({ type: 'timestamp'}) // Generato automaticamente dal DB
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'}) // Generato automaticamente dal DB
    updatedAt: Date;
}