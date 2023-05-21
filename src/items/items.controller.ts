import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateItemDto } from './dtos/items.add-item.dto';
import { ItemsService } from './items.service';
import { Item } from './schemas/items.schema';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'get all items' })
  @ApiResponse({ status: 200, type: Array<Item> })
  get() {
    return this.itemsService.getAll();
  }

  @Get(':item_id')
  @ApiOperation({ summary: 'get item by id' })
  @ApiResponse({ status: 200, type: Item })
  getById(@Param('item_id') item_id: string) {
    return this.itemsService.getById(item_id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'add a new item' })
  @ApiResponse({ status: 201, type: Item })
  @ApiBearerAuth()
  create(@Body() createItemDto: CreateItemDto, @Req() req) {
    if (!req.user.is_admin) {
      throw new UnauthorizedException();
    }

    return this.itemsService.create(createItemDto);
  }

  @UseGuards(AuthGuard)
  @Put(':item_id')
  @ApiOperation({ summary: 'edit an item' })
  @ApiResponse({ status: 200, type: Item })
  @ApiBearerAuth()
  update(
    @Param('item_id') item_id: string,
    @Body() createItemDto: CreateItemDto,
    @Req() req,
  ) {
    if (!req.user.is_admin) {
      throw new UnauthorizedException();
    }

    return this.itemsService.update(item_id, createItemDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':item_id')
  @ApiOperation({ summary: 'delete an item' })
  @ApiResponse({ status: 200, type: Item })
  @ApiBearerAuth()
  delete(@Param('item_id') item_id: string, @Req() req) {
    if (!req.user.is_admin) {
      throw new UnauthorizedException();
    }

    return this.itemsService.delete(item_id);
  }
}
