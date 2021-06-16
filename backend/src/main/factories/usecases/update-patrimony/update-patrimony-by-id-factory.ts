import { UpdatePatrimonyByIdData } from '@/data/usecases/patrimony/update-patrimony-by-id'
import { UpdatePatrimonyById } from '@/domain/usecase/patrimony/update-patrimony-by-id'
import { PatrimonyRepository } from '@/infra/db/repositories/patrimony'

export function makeUpdatePatrimonyById (): UpdatePatrimonyById {
  const verifyByIdRepository = new PatrimonyRepository()
  const updateByIdRepository = new PatrimonyRepository()
  const updateByIdData = new UpdatePatrimonyByIdData(verifyByIdRepository, updateByIdRepository)
  return updateByIdData
}
