
import Usuario, {Userdocment} from "./User";

async function getNextUserId(): Promise<number> {
    const user = await Usuario.findOne().sort({ id: -1 }).exec();
    return user ? user.id + 1 : 1;
  }

class UserService{
    
    public async createUser(name:string, lastname: string, adress: string, age: number): Promise<Userdocment>{
        const id = await getNextUserId();
        const user = new Usuario({id, name, lastname, adress, age});
        return await user.save()

    }
    public async getUsers(): Promise<Userdocment[]> {
        return await Usuario.find().exec();
      }
    }
export default UserService
