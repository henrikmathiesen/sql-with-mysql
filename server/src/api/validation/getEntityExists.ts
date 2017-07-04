import { EntityDbo } from '../../db/dbo/EntityDbo';
import { getEntityByIdQuery } from '../../db/queries/getEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';

export const entityExistsInvalidMessage = 'Entity does not exist';

export const getEntityExists = (tableName: DbTableEnum, id: number): Promise<EntityDbo> => {
    return new Promise((resolve, reject) => {

        getEntityByIdQuery(tableName, id)
            .then((entity: EntityDbo) => { 
                resolve(entity);
            })
            .catch((error) => { 
                reject(error);
            });

    });
};
