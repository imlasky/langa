/** @type {import('./$types').Actions} */
export const actions = {
    register: async ({cookies, request}) => {
        const data = await request.formData()
        const email = data.get('email');
        const password = data.get('password');
        
    }
  };