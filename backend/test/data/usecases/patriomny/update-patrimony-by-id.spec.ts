import { DbCheckIfPatrimonyExists } from '@/data/protocols/db/patrimony/db-check-if-patrimony-exists-by-id'
import { UpdatePatrimonyById } from '@/domain/usecase/patrimony/update-patrimony-by-id'
import { UpdatePatrimonyByIdData } from '@/data/usecases/patrimony/update-patrimony-by-id'
import { Patrimony, PatrimonyState } from '@/domain/model/patrimony'
import { UserPermission } from '@/domain/model/user'
import { DbUpdatePatrimonyById } from '@/data/protocols/db/patrimony/db-update-patrimony-by-id'
function makeDbCheckIfPatrimony (): DbCheckIfPatrimonyExists {
  class DbCheckIfPatrimonyExistsStub implements DbCheckIfPatrimonyExists {
    async verifyById (id: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new DbCheckIfPatrimonyExistsStub()
}
function makeDbUpdatePatrimonyById (): DbUpdatePatrimonyById {
  class DbUpdatePatrimonyByIdStub implements DbUpdatePatrimonyById {
    async updateById (patrimony: Patrimony): Promise<void> {
      return await Promise.resolve(null)
    }
  }
  return new DbUpdatePatrimonyByIdStub()
}
function makeFakePatrimony (): Patrimony {
  return {
    id: 'any_id',
    code: 'any_code',
    description: 'any_description',
    state: PatrimonyState.GOOD,
    entryDate: new Date('1/1/2021'),
    lastConferenceDate: new Date('1/1/2021'),
    value: 200,
    patrimonyItens: []
  }
}
interface Sut {
  sut: UpdatePatrimonyById
  verifyById: DbCheckIfPatrimonyExists
  updateById: DbUpdatePatrimonyById
}

const makeSut = (): Sut => {
  const verifyById = makeDbCheckIfPatrimony()
  const updateById = makeDbUpdatePatrimonyById()
  const sut = new UpdatePatrimonyByIdData(verifyById, updateById)
  return {
    sut,
    verifyById,
    updateById
  }
}

describe('UpdatePatrimonyByIdData', () => {
  test('Should call checkIfPatrimonyExistsById with patrimony id', async () => {
    const { sut, verifyById } = makeSut()
    const verifySpy = jest.spyOn(verifyById, 'verifyById')
    const patrimony = makeFakePatrimony()
    await sut.updateById(UserPermission.INVENTORIOUS, patrimony)
    expect(verifySpy).toHaveBeenCalledWith(patrimony.id)
  })
  test('Should return null if verifyById returns null', async () => {
    const { sut, verifyById } = makeSut()
    jest.spyOn(verifyById, 'verifyById').mockResolvedValueOnce(false)
    const patrimony = makeFakePatrimony()
    const res = await sut.updateById(UserPermission.INVENTORIOUS, patrimony)
    expect(res).toBeNull()
  })
  test('Should call UpdatePatrimonyById with patrimony', async () => {
    const { sut, updateById } = makeSut()
    const updateSpy = jest.spyOn(updateById, 'updateById')
    const patrimony = makeFakePatrimony()
    await sut.updateById(UserPermission.INVENTORIOUS, patrimony)
    expect(updateSpy).toHaveBeenCalledWith(patrimony)
  })
  test('Should return true if UpdatePatrimonyById returns void', async () => {
    const { sut } = makeSut()
    const patrimony = makeFakePatrimony()
    const res = await sut.updateById(UserPermission.INVENTORIOUS, patrimony)
    expect(res).toBeTruthy()
  })
})