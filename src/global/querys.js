/*
import { useSQLiteContext } from 'expo-sqlite';


const db = useSQLiteContext();

*/

import { formatDateToDMY, parseDateToUTCCleaned } from "./functions";



function generateIdSession(idUser) {
  return `${idUser}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}


// ==========================================================
// ====================== CONSTRUCT DB ======================
// ==========================================================
export const clearT_Users = async (db) => {
    try {
        await db.execAsync(`
            DELETE FROM "user"
        `);
    } catch (error) {
        console.log("no se puedo eliminar los usuarios")
        console.error(error);
    }
}
export const clearT_TypeSessions = async (db)  => {
    try {
        await db.execAsync(`
            DELETE FROM "type_session"
        `);
    } catch (error) {
        console.log("no se pudo eliminar los tipos de sesiones")
        console.error("error")
    }
}
export const clearT_config = async (db) => {
    try {
        await db.execAsync(`
            DELETE FROM "config"
        `);
    } catch (error) {
        console.log("no se pudo eliminar las configuraciones")
        console.error("error")
    }
}
export const addBasicData = async (db) => {
    //Crear usuario admin
    try {
        const utcNow = parseDateToUTCCleaned(new Date());
        let query = `
        INSERT OR REPLACE INTO "user" ("id_user", "email", "password", "name", "time_edit", "time_sync") 
            VALUES (1, 'admin@archery.com','admin','admin', '${utcNow}', '${utcNow}');
            VALUES (2, 'admin2@archery.com','admin2','admin2', '${utcNow}', '${utcNow}');
        `
        await db.execAsync(query);
    } catch (error) {
        console.error("imposible guardar usuario (predeterminado)")
        console.error(error)
    }
    
    //crear los tipos de sesiones
    try {
        const utcNow = parseDateToUTCCleaned(new Date());
        let query = `
            INSERT OR REPLACE INTO "type_session" ("id_user", "name", "points","values", "time_edit") 
            VALUES 
            (1, 'Clásico', '["0","1","2","3","4","5","6","7","8","9","10","X"]', '[0,1,2,3,4,5,6,7,8,9,10,10]', '${utcNow}'),
            (1, '4 puntos', '["X","-","+","✓"]', '[0,1,2,3]', '${utcNow}'),
            (2, '5 puntos', '["X","-","+","✓","O"]', '[0,1,2,3,4]', '${utcNow}');

        `
        await db.execAsync(query);
    } catch (error) {
        console.error("imposible guardar los tipos de sessiones (predeterminados)")
        console.error(error)
    }

    //crea las configuraciones (basic)
    try {
        const utcNow = parseDateToUTCCleaned(new Date());
        let query = `
            INSERT OR REPLACE INTO "config" ("id_user", "name_config","config_json", "time_edit") 
            VALUES (1, 'basic', '{"darkMode":true, "modelViewSesions":"medium"}', '${utcNow}');
            `
        await db.execAsync(query);
    } catch (error) {
        console.error("imposible guardar configuración (predeterminada)")
        console.error(error)
    }

    const dataSession = [
        [generateIdSession(1), 1, '9/8/2024', 45, 70, 'Clásico'],
        [generateIdSession(1), 1, '10/8/2024', 45, 70, 'Clásico'],
        [generateIdSession(1), 1, '18/2/2025', 45, 70, 'Clásico'],
        [generateIdSession(1), 1, '5/7/2025', 45, 70, '4 puntos'],
        [generateIdSession(1), 1, '12/7/2025', 35, 50, 'Clásico'],
        ];
    //crear sesiones
    try{
        const utcNow = new Date();
        const timestamps = Array.from({ length: 5 }, (_, i) => 
            new Date(utcNow.getTime() + i * 10).toISOString().replace("T", " ").replace("Z", "")
        );        

        for (let i = 0; i < dataSession.length; i++) {
            const [id, idUser, date, pound, distance, typeSession] = dataSession[i];
            const time_edit = timestamps[i];
            await db.runAsync(
                `INSERT OR REPLACE INTO "session"
                ("id_session", "id_user", "name_type_session", "date", "bow", "pound", "distance", "time_edit")
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [id,idUser, typeSession, date, 'Recurvo', pound, distance, time_edit]
            );
        }
    }catch (error){
        console.error("imposible guardar las sesiones (predeterminadas)")
        console.error(error)
    }

    //sets
    try {
        await db.execAsync(`
            INSERT OR REPLACE INTO "set"("id_session", "n_set", "points")
            VALUES ("${dataSession[0][0]}", 1,'["8","7","8","6","9","8"]'),
                ("${dataSession[0][0]}", 2,'["7","8","8","7","9","9"]'),
                ("${dataSession[0][0]}", 3,'["7","8","8","10","9","X"]'),
                ("${dataSession[1][0]}", 1,'["8","7","7","8","6","7"]'),
                ("${dataSession[1][0]}", 2,'["5","7","7","7","8","7"]'),
                ("${dataSession[1][0]}", 3,'["9","8","9","8","8","7"]'),
                ("${dataSession[2][0]}", 1,'["8","7","9","9","8","8"]'),
                ("${dataSession[2][0]}", 2,'["9","9","8","8","9","8"]'),
                ("${dataSession[2][0]}", 3,'["10","10","8","7","9","8"]'),
                ("${dataSession[3][0]}", 1,'["X","-","+"]'),
                ("${dataSession[3][0]}", 2,'["✓","✓","+"]'),
                ("${dataSession[3][0]}", 3,'["-","✓","_"]');
            `);
    } catch (error) {
        console.error("imposible guardar los sets (predeterminados)")
        console.error(error)
    }
}

export const createTables = async(db) => {
    try {
        //user
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "user" (
            "id_user" INTEGER NOT NULL UNIQUE,
            "email" TEXT NOT NULL UNIQUE,
            "password" TEXT NOT NULL,
            "name" TEXT NOT NULL UNIQUE,
            "time_edit" TEXT NOT NULL,
            "time_sync" TEXT NOT NULL,
            PRIMARY KEY("id_user" AUTOINCREMENT)
        );
        `);
        //session
        /*
        -- ID como UUID o ID compuesta (ej: id_user + timestamp)
        -- Match con tipo de ID en user (texto si usás UUID)
        -- Fecha de la sesión
         */
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "session" (
            "id_session" TEXT NOT NULL PRIMARY KEY,
            "id_user" TEXT NOT NULL,
            "name_type_session" TEXT NOT NULL,
            "date" TEXT NOT NULL,
            "bow" TEXT,
            "pound" INTEGER,
            "distance" INTEGER,
            "time_edit" TEXT NOT NULL,
            FOREIGN KEY ("id_user") REFERENCES "user"("id_user"),
            FOREIGN KEY ("id_user", "name_type_session")
                REFERENCES "type_session"("id_user", "name")
        );
        `);
        //type_session
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "type_session" (
            "id_user" TEXT NOT NULL,
            "name" TEXT NOT NULL,
            "points" TEXT,
            "values" TEXT,
            "time_edit" TEXT NOT NULL,
            PRIMARY KEY ("id_user", "name"),
            FOREIGN KEY ("id_user") REFERENCES "user"("id_user")
        );
        `);
        //set
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "set" (
            "id_session" TEXT NOT NULL,
            "n_set" INTEGER NOT NULL,
            "points" TEXT,
            PRIMARY KEY ("id_session", "n_set"),
            FOREIGN KEY ("id_session") REFERENCES "session"("id_session")
        );
        `);
        //config
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "config" (
            "id_user" INTEGER NOT NULL,
            "name_config" TEXT NOT NULL,
            "config_json" TEXT,
            "time_edit" TEXT NOT NULL,
            PRIMARY KEY ("id_user", "name_config"),
            FOREIGN KEY("id_user") REFERENCES "user"("id_user")
        );
        `);        
    } catch (error) {
        console.error("error al crear la DB")
        console.error(error)
    }
    await addBasicData(db)
};
// ============== Deleat ========== 
export const deleteTable = async (db, table) => {
    await db.execAsync(`DROP TABLE IF EXISTS ${table}`)
}
export const deleteAllTables = async (db) => {
    try {
        await db.execAsync(`DROP TABLE IF EXISTS user;
            DROP TABLE IF EXISTS session;
            DROP TABLE IF EXISTS type_session;
            DROP TABLE IF EXISTS "set";
            DROP TABLE IF EXISTS config`);
    } catch (error) {
        console.error("no se pudieron eliminar las tablas")
        console.error(error)
    }
}

// ==========================================================
// ====================== Querys Tests ======================
// ==========================================================
export const getAllDataTable = async (db, table) => {
    try {
        const data = await db.getAllAsync(`SELECT * FROM "${table}"`)
        console.log(data)
        return data;
    }catch(error){
        console.error(error)
        throw error;
    }
};
export const getAllUsers = async (db) => {
    try {
        const data = await db.getAllAsync('SELECT * FROM user')
        console.log(data)
        return data;
    }catch(error){
        throw error;
    }
}
// ==========================================================
// ====================== Querys DB ======================
// ==========================================================

// ______________ Reads _______________
//Users
export const getUsuario = async (db, name, password) => {
  try {
    const idUsuario = await db.getFirstAsync('SELECT "id_user" FROM "user" WHERE "name"=? and "password"=?',
        [name, password]
    );
    if (!idUsuario) {
      return null;
    }

    return idUsuario.id_user;
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    throw error;
  }
};

//Configs
/*=== Tipos de configuración
=> basic
=> Home
=> sessionView
*/
export const loadConfig = async (db, id_user, type_config) => {
    try {
        const config = await db.getFirstAsync(`
            SELECT config_json FROM config WHERE id_user=? and name_config=?`,
            [id_user, type_config]
        );
        return config ? JSON.parse(config.config_json) : null;
    } catch (error) {
        console.log("no se pudo leer la configuración");
        console.error(error);
        return null;
    }
}

//Sessions
export const readSessions = async (db, id_user) => {
    try {
        const sessions = await db.getAllAsync(`
            SELECT * FROM session WHERE id_user=?`,
            [id_user]);
        // console.debug("============== IN GET SESSIONS =====")
        // await getAllDataTable(db, "set");
        // console.debug("______________________________________-")
        for (const session of sessions){
            // console.debug(session.id_session)
            const sets = await db.getAllAsync(`
                SELECT n_set, points FROM "set" WHERE id_session = ?`,
            [session.id_session]);
            console.debug(sets)
            session.setsList = sets.map(set => ({
                n_set: set.n_set,
                points: JSON.parse(set.points)
            }))
        }
        console.log("sessions readed => ", sessions)
        return sessions;
        
    }catch(error){
        console.error("no se pudo leer las sesiones de tiro");
        console.error(error)
        return [];
    }
}

// typeSessions
export const getAllTypeSessionsByUserId = async (db, id_user) => {
    try {
        const data = await db.getAllAsync(`SELECT * FROM type_session WHERE id_user = ?`,[id_user])
        var result = []
        for (let i = 0; i < data.length; i++) {
            const points = data[i].points;
            const values = data[i].values
            result.push({
                id_user: data[i].id_user,
                name: data[i].name,
                points: JSON.parse(points),
                values: JSON.parse(values),
                time_edit: data[i].time_edit,
            });
        }
        return result;
    }catch(error){
        console.error(error)
        throw error;
    }
}

export const getIdSessionByDate = async (db, date) => {
    try {
        const idSession = await db.getFirstAsync(`
            SELECT "id_session" FROM session WHERE date=?`,
            [date]
        );
        // console.log(idSession.id_session)
        return idSession.id_session;
    } catch (error) {
        console.error("No se pudo obtener la id de la sesión")
        console.error(error)
    }
}

export const getSession = async (db, idSession) => {
    try {
        // console.debug("======== GET SESSION =========== ")
        // console.debug("idSession=>",idSession, " typeof(",typeof(idSession),")");
        const query = `SELECT * FROM "session" WHERE id_session = "${idSession}"`
        // console.debug(`query=>
        //     `, query)
        const session = await db.getFirstAsync(query)
        
        // console.debug(session)
        const sets = await db.getAllAsync(`
            SELECT n_set, points FROM "set" WHERE id_session = ?`, [idSession])
        
        session.setsList = sets.map(set => ({
            n_set: set.n_set,
            points: JSON.parse(set.points)
        }))
        return session
    } catch (error) {
        console.error("no se pudo cargar la sesion");
        console.error(error)
        return null
    }
}

// ______________ Creates _______________

export const insertConfig = async (db, id_user, type_config, config_json) => {
    try {
        const utcNow = new Date().toISOString();
        await db.execAsync(`
            INSERT OR REPLACE INTO "config" ("id_user", "name_config","config_json", "time_edit") 
            VALUES (?, ?, ?, ?);
        `, [id_user, type_config, config_json, utcNow]);
        // console.log("guardada configuración")
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
        return null
    }
}

export const createNewSession = async (db,idUser, date, bow, pound, distance, nameTypeSession, sets, arrows) => {
    let arrayArrows = '[';
    for (let i = 0; i < arrows; i++) {
        arrayArrows = arrayArrows + '"_"';
        if (i < arrows-1)
            arrayArrows = arrayArrows + ',';
    }
    arrayArrows = arrayArrows + ']';
    console.log(arrayArrows);
    
    try {
        let idNewSession = generateIdSession(idUser)
        let dateSession = formatDateToDMY(date);

        const utcNow = new Date();

        let queryS = `INSERT OR REPLACE INTO "session" 
            ("id_session", "id_user", "date", "bow", "pound", "distance", "name_type_session", "time_edit")
            VALUES
            ("${idNewSession}", ${idUser},"${dateSession}","${bow}",${pound},${distance},"${nameTypeSession}","${parseDateToUTCCleaned(utcNow)}");`
        console.log(queryS)
  
        await db.execAsync(queryS);


        let query = `INSERT OR REPLACE INTO "set" ("id_session", "n_set", "points") VALUES `;
        for (let i = 0; i < sets; i++) {
            // console.debug(`set_${i}=> ${idNewSession}-${i+1}-${arrayArrows}`)
            query = query + `('${idNewSession}', ${i+1},'${arrayArrows}')`
            if (i < sets-1)
                query = query + ',';
        }
        console.log(query)
        
        try {
            await db.execAsync(query)
        } catch (error) {
            console.error("no se pudo crear los sets")
            console.error(error)
        }

        return idNewSession;
    } catch (error) {
        console.error("session NOT created");
        console.error(error)
        return null
    }
}

export const createOrReplaceSet = async (db, idSession, set) => {
    console.debug("entra al replace")
    let listPoints = ""
    set.points.forEach((point, index) => {
        listPoints = listPoints + `"${point}"`;
        if (index < set.points.length-1)listPoints = listPoints + `,`;
    })
    console.debug("idSession=>",idSession)
    console.debug("set.n_set=>",set.n_set)
    console.debug("listPoints=>",listPoints)
    let query = `INSERT OR REPLACE INTO "set" ("id_session", "n_set", "points") VALUES`;
    query = query + `('${idSession}', ${set.n_set},'[${listPoints}]')`
    console.debug("query=>",query)
    try {
        await db.execAsync(query);
        // console.log("set:",set.n_set," modificado")
    } catch (error) {
        console.log("no se pudo crear el sets")
    }
}


// ==================== UPDATES ===============


export const updateTimeEditInSession = async (db, idSession) => {
    try {
        let dateString = parseDateToUTCCleaned(new Date());
        let query = `UPDATE "session" 
                SET "time_edit" = ?
                WHERE "id_session" = "${idSession}"`
        console.log(query)
        let result = await db.runAsync(query,[dateString])
        if (result.changes > 0)
            console.log("cambios hechos")
        else
            console.log("ninguna sesion fue afectada")
        
    } catch (error) {
        console.error("no se pudo editar el time_edit de la sesion: ", idSession);
        console.error(error)    
    }
}