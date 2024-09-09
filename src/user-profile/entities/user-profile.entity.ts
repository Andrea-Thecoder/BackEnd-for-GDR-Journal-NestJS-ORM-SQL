
import { Users } from 'src/users/entities/users.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';




@Entity()
export class UserProfile {

    @PrimaryGeneratedColumn({type: "int", unsigned: true}) //AI (auto incrementa)
    id: number;

    //relazione 1:1. Primo params, fn anonima dove specifichiamo il nome della seconda entità. param 2: key assegnata ad OneTone è il params => params.<nome key dell'altra tabella>. In questo modo sono collegate.
    @OneToOne(()=> Users, users => users.profile,{ nullable: false, onDelete: 'CASCADE'})
    //essendo qui la foreign key dobbiamo inserire il decoratorjoincoumn , dove specifichiamo il nome della FK che appararià nel db. Il collegamento con la PK lo fa i nautoamtico
    @JoinColumn({name:"UserId", referencedColumnName: "id"})
    users: Users;

    @Column({ type: 'varchar', length: 100 })
    name:string;

    @Column({ type: 'varchar', length: 100 })
    lastname:string;

    @Column({ type: 'varchar', length: 30 })
    country:string;

    @Column({ type: "date"}) //speciifca che nel DB troverà di tipo date
    birthDate: Date;

    @CreateDateColumn({ type: 'timestamp'}) // Generato automaticamente dal DB
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp'}) // Generato automaticamente dal DB
    updatedAt: Date;
}