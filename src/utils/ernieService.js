import axios from 'axios'

const AK = 'UfUWGZBohsqKn6apno6a4jyt'
const SK = 'Ph3h99e3NEG0MbJbc68I6DFiJ5Ux67eg'

// 获取Access Token
async function getAccessToken() {
  try {
    const response = await axios.post('/api/oauth/2.0/token', null, {
      params: {
        grant_type: 'client_credentials',
        client_id: AK,
        client_secret: SK
      }
    })
    console.log('Access Token:', response.data.access_token)
    return response.data.access_token
  } catch (error) {
    console.error('获取Access Token失败:', error)
    throw error
  }
}

// 获取AI回复
export async function getAIResponse(message) {
  try {
    const accessToken = await getAccessToken()
    const response = await axios.post(
      '/api/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-lite-8k',
      {
        messages: [{ role: 'user', content: message }],
        temperature: 0.95,
        top_p: 0.7,
        penalty_score: 1
      },
      {
        params: { access_token: accessToken },
        headers: { 'Content-Type': 'application/json' }
      }
    )
    console.log('AI回复:', response.data.result)
    return response.data.result
  } catch (error) {
    console.error('获取AI回复失败:', error)
    throw error
  }
}
