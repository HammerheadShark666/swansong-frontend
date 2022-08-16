// import testAction from '~/      /vue-test-actions'
// import * as artistStore from '../store/artist.module.js'
// import userSerive from '~/services/myUserService'

// describe('getUser', () => {
//   test('If success', () => {
//     const payload = 1
//     userSerive.fetchUser = jest.fn().mockReturnValue({ data: { id: 1 } })
//     const expectedCommits = [
//       { type: 'setLoading', payload: true },
//       { type: 'setUser', payload: { id: 1 } },
//       { type: 'setLoading', payload: false }
//     ]
//     const expectedDispatchs = [
//       { type: 'getUserPermission', payload: 1 }
//     ]
//     testAction(artistStore.getUser, expectedCommits, expectedDispatchs, payload)
//   })
// })