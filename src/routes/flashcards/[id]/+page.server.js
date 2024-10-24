export async function load({ params, locals:{supabase}}) {
	const { id } = params
    const {data:flashdeck,error} = await supabase
	.from('flashdeck')
	.select('*')
	.eq('id',id)
	.single()
	if (error){
		console.error("other error",error)
	}
	const fdid = parseInt(id)
	return {flashdeck, fdid}
}
