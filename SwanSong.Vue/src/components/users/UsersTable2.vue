<template>
    <div>  
		<el-row :gutter="20"> 
			<el-col :span="24">				 
                <el-table :data="tableData" height="250" style="width: 100%">
                    <el-table-column prop="date" label="Surname" width="180" />
                    <el-table-column prop="name" label="First Name" width="180" />
                    <el-table-column prop="address" label="Email" />
                    <el-table-column prop="role" label="Role" />
                </el-table>	 
			</el-col>
		</el-row>
	</div>    
</template>

<script>    
export default {
	name: "UsersTable",  
	data() {
		return {
            title: "Users", 
            tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
          role: 'Admin'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-08',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-06',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-07',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
		}
	},   
	components:{
        
	}, 
};
</script>