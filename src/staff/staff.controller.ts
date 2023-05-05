import { Body, Controller, Delete, Get, Param, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateStaffDto } from './dtos/staff.create.dto';
import { Staff } from './schemas/staff.schema';
import { StaffService } from './staff.service';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Get()
    @ApiOperation({summary:'get all staff'})
    @ApiResponse({status:200, type: Array<Staff>})
    getAll(){
        return this.staffService.getAll()
    }

    @Get(':staff_id')
    @ApiOperation({summary:'get staff by id'})
    @ApiResponse({status:200, type: Staff})
    get(@Param('staff_id') staff_id: string){
        return this.staffService.findById(staff_id)
    }

    @UseGuards(AuthGuard)
    @Post()
    @ApiOperation({summary:'add a new staff'})
    @ApiResponse({status:201, type: Staff})
    @ApiBearerAuth()
    create(@Body() createStaffDto: CreateStaffDto){
        return this.staffService.create(createStaffDto)
    }

    @UseGuards(AuthGuard)
    @ApiOperation({summary:'update staff by id'})
    @ApiResponse({status:200, type: Staff})
    @Put(':staff_id')
    @ApiBearerAuth()
    update(@Param('staff_id') staff_id: string,@Body() createStaffDto: CreateStaffDto){
        return this.staffService.updateStaff(staff_id,createStaffDto)
    }

    @UseGuards(AuthGuard)
    @Delete(':staff_id')
    @ApiOperation({summary:'delete staff by id'})
    @ApiResponse({status:200, type: Staff})
    @ApiBearerAuth()
    delete(@Param('staff_id') staff_id: string, @Req() req){
        if(!req.user.is_admin){
            throw new UnauthorizedException()
        }

        return this.staffService.deleteStaff(staff_id)
    }

}
