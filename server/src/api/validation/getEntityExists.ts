import { EntityDbo } from '../../db/dbo/EntityDbo';
import { getEntityByIdQuery } from '../../db/queries/getEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';

export const getEntityExistsInvalidMessage = 'Entity does not exist';

export const getEntityExists = (tableName: DbTableEnum, id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {

        getEntityByIdQuery(tableName, id)
            .then((entity: EntityDbo) => { 
                const entityExists = (entity && !entity.deleted) ? true : false;
                resolve(entity);
            })
            .catch((error) => { 
                reject(error);
            });

    });
};
