/*
import { useSQLiteContext } from 'expo-sqlite';


const db = useSQLiteContext();

*/

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
        await db.execAsync(`
            INSERT OR REPLACE INTO "user" ("id_user", "email", "password", "name", "time_edit", "time_sync") 
            VALUES (1, 'admin@archery.com','admin','admin', datetime('now'), datetime('now'));
        `);
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
    }
    //crear los tipos de sesiones
    try {
        await db.execAsync(`
            INSERT OR REPLACE INTO "type_session" ("id_type_session", "name", "points","values", "time_edit") 
            VALUES 
            (1, 'Clásico', '[0,1,2,3,4,5,6,7,8,9,10,"x"]', '[0,1,2,3,4,5,6,7,8,9,10,10]', datetime('now')),
            (2, '4 puntos', '["X","-","+","✓"]', '[0,1,2,3]', datetime('now'));
        `);
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
    }
    //crea las configuraciones (basic)
    try {
        await db.execAsync(`
            INSERT OR REPLACE INTO "config" ("id_user", "name_config","config_json", "time_edit") 
            VALUES (1, 'basic', '{"darkMode":true, "modelViewSesions":"medium"}', datetime('now'));
        `);
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
    }
    //crear sesiones
    try{
        await db.execAsync(`
            INSERT OR REPLACE INTO "session"("id_user","date","bow","pound","distance","time_edit","type_session")
            VALUES (1, "9/8/2024", "Recurvo", 45, 70, datetime('now'),1),
                (1, "10/8/2024", "Recurvo", 45, 70, datetime('now'),1),
                (1, "18/2/2025", "Recurvo", 45, 70, datetime('now'),1),
                (1, "5/7/2025", "Recurvo", 45, 70, datetime('now'),2),
                (1, "12/7/2025", "Recurvo", 35, 50, datetime('now'),1);
            `);
    }catch (error){
        console.error("imposible guardar las sesiones predeterminadas")
        console.error(error)
    }

    //sets
    try {
        await db.execAsync(`
            INSERT OR REPLACE INTO "set"("id_session", "points")
            VALUES (1, '["8","7","8","6","9","8"]'),
                (1, '["7","8","8","7","9","9"]'),
                (1, '["7","8","8","10","9","X"]'),
                (2, '["8","7","7","8","6","7"]'),
                (2, '["5","7","7","7","8","7"]'),
                (2, '["9","8","9","8","8","7"]'),
                (3, '["8","7","9","9","8","8"]'),
                (3, '["9","9","8","8","9","8"]'),
                (3, '["10","10","8","7","9","8"]'),
                (4, '["X","-","+"]'),
                (4, '["✓","✓","+"]'),
                (4, '["-","✓","_"]');
            `);
    } catch (error) {
        
    }
}
export const createTables = async(db) => {
    try {
        //user
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "user" (
            "id_user" INTEGER NOT NULL UNIQUE,
            "email" TEXT,
            "password" TEXT,
            "name" TEXT,
            "time_edit" TEXT,
            "time_sync" TEXT,
            PRIMARY KEY("id_user" AUTOINCREMENT)
        );
        `);
        //session
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "session" (
            "id_session" INTEGER NOT NULL UNIQUE,
            "id_user" NUMERIC NOT NULL,
            "date" TEXT NOT NULL,
            "bow" TEXT,
            "pound" INTEGER,
            "distance" INTEGER,
            "time_edit" TEXT,
            "type_session" INTEGER,
            PRIMARY KEY("id_session" AUTOINCREMENT),
            FOREIGN KEY("id_user") REFERENCES "user"("id_user"),
            FOREIGN KEY("type_session") REFERENCES "type_session"("id_type_session")
        );
        `);
        //type_session
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "type_session" (
            "id_type_session" INTEGER NOT NULL UNIQUE,
            "name" TEXT,
            "points" TEXT,
            "values" TEXT,
            "time_edit" TEXT,
            PRIMARY KEY("id_type_session" AUTOINCREMENT)
        );
        `);
        //set
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "set" (
            "id_set" INTEGER NOT NULL UNIQUE,
            "id_session" INTEGER NOT NULL,
            "points" TEXT,
            PRIMARY KEY("id_set" AUTOINCREMENT)
            FOREIGN KEY("id_session") REFERENCES "session"("id_session")
        );
        `);
        //config
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "config" (
            "id_user" INTEGER NOT NULL,
            "name_config" TEXT,
            "config_json" TEXT,
            "time_edit" TEXT,
            PRIMARY KEY ("id_user", "name_config")
            FOREIGN KEY("id_user") REFERENCES "user"("id_user")
        );
        `);        
    } catch (error) {
        console.error("error al crear la DB")
        console.error(error)
    }
    await addBasicData(db)
};
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
        const data = await db.getAllAsync(`SELECT * FROM ${table}`)
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
export const loadConfig = async (db, id_user, type_config) => {
/*=== Tipos de configuración
=> basic
=> Home
=> sessionView
*/
    try {
        const config = await db.getFirstAsync(`
            SELECT config_json FROM config WHERE id_user=? and name_config=?`,
            [id_user, type_config]
        );
        console.log(config.config_json)
        return config ? JSON.parse(config.config_json) : null;
    } catch (error) {
        console.log("no se pudo leer la configuración");
        console.error(error);
        return null;
    }
}

export const insertConfig = async (db, id_user, type_config, config_json) => {
    try {
        await db.execAsync(`
            INSERT OR REPLACE INTO "config" ("id_user", "name_config","config_json", "time_edit") 
            VALUES (?, ?, ?, datetime('now'));
        `, [id_user, type_config, config_json]);
        console.log("guardada configuración")
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
    }
}

export const readSessions = async (db, id_user) => {
    try {
        const sessions = await db.getAllAsync(`
            SELECT * FROM session WHERE id_user=?`,
            [id_user]);
        
        for (const session of sessions){
            const sets = await db.getAllAsync(`
                SELECT id_set, points FROM "set" WHERE id_session = ?`,
            [session.id_session]);
            
            session.setsList = sets.map(set => ({
                id_set: set.id_set,
                points: JSON.parse(set.points)
            }))
        }
        // console.log("sessions readed => ", sessions)
        return sessions;
        
    }catch(error){
        console.error("no se pudo leer las sesiones de tiro");
        console.error(error)
        return [];
    }
}