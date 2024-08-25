import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
    constructor (private coursesService: CoursesService){}

    @Get()
    @ApiOkResponse({description: 'List of All Courses'})
    async getCourses() {
        const courses = await this.coursesService.getCourses();
        return courses;
    }

    @Get(':courseId')
    @ApiOkResponse({description: 'List of Courses'})
    async getCourse(@Param('courseId') courseId) {
        const course = await this.coursesService.getCourse(courseId);
        return course;
    }

    @Post()
    @ApiCreatedResponse({description: 'Add a Courses'})
    async addCourse(@Body() createCourseDto: CreateCourseDto) {
        const course = await this.coursesService.addCourse(createCourseDto);
        return course;
    }

    @Delete()
    @ApiOkResponse({description: 'Remove a Courses'})
    async deleteCourse(@Query() query) {
        const courses = await this.coursesService.deleteCourse(query.courseId);
        return courses;
    }
}
