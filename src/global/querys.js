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
            INSERT OR REPLACE INTO "user" ("id_usuario", "correo", "contraseña", "nombre", "time_edit", "time_sync") 
            VALUES (1, 'admin@archery.com','admin','admin', datetime('now'), datetime('now'));
        `);
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
    }
    //crear los tipos de sesiones
    try {
        await db.execAsync(`
            INSERT OR REPLACE INTO "type_session" ("id_type_session", "nombre", "puntos","valores", "time_edit") 
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
            INSERT OR REPLACE INTO "config" ("id_usuario", "nombre_config","config_json", "time_edit") 
            VALUES (1, 'basic', '{"darkMode":true, "modelViewSesions":"medium"}', datetime('now'));
        `);
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
    }
    //crear sesiones
}
export const createTables = async(db) => {
    try {
        //user
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "user" (
            "id_usuario" INTEGER NOT NULL UNIQUE,
            "correo" TEXT,
            "contraseña" TEXT,
            "nombre" TEXT,
            "time_edit" TEXT,
            "time_sync" TEXT,
            PRIMARY KEY("id_usuario" AUTOINCREMENT)
        );
        `);
        //session
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "session" (
            "id_session" INTEGER NOT NULL UNIQUE,
            "id_usuario" NUMERIC NOT NULL,
            "fecha" TEXT NOT NULL,
            "arco" TEXT,
            "libraje" INTEGER,
            "distancia" INTEGER,
            "time_edit" TEXT,
            "type_session" INTEGER,
            PRIMARY KEY("id_session" AUTOINCREMENT),
            FOREIGN KEY("id_usuario") REFERENCES "user"("id_usuario"),
            FOREIGN KEY("type_session") REFERENCES "type_session"("id_type_session")
        );
        `);
        //type_session
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "type_session" (
            "id_type_session" INTEGER NOT NULL UNIQUE,
            "nombre" TEXT,
            "puntos" TEXT,
            "valores" TEXT,
            "time_edit" TEXT,
            PRIMARY KEY("id_type_session" AUTOINCREMENT)
        );
        `);
        //set
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "set" (
            "id_session" INTEGER NOT NULL,
            "puntos" TEXT,
            FOREIGN KEY("id_session") REFERENCES "session"("id_session")
        );
        `);
        //config
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS "config" (
            "id_usuario" INTEGER NOT NULL,
            "nombre_config" TEXT,
            "config_json" TEXT,
            "time_edit" TEXT,
            PRIMARY KEY ("id_usuario", "nombre_config")
            FOREIGN KEY("id_usuario") REFERENCES "user"("id_usuario")
        );
        `);        
    } catch (error) {
        console.error("error al crear la DB")
        console.error(error)
    }
    await addBasicData(db)
};
export const deleteTable = async (db) => {
    await db.execAsync('DROP TABLE IF EXISTS configs')
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
    const id_usuario = await db.getFirstAsync('SELECT id_usuario FROM user WHERE nombre=? and contraseña=?',
        [name, password]
    );
    if (!id_usuario) {
      return null;
    }

    return id_usuario.id_usuario;
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
            SELECT config_json FROM config WHERE id_usuario=? and nombre_config=?`,
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
            INSERT OR REPLACE INTO "config" ("id_usuario", "nombre_config","config_json", "time_edit") 
            VALUES (?, ?, ?, datetime('now'));
        `, [id_user, type_config, config_json]);
        console.log("guardada configuración")
    } catch (error) {
        console.error("imposible guardar configuración predeterminada")
        console.error(error)
    }
}