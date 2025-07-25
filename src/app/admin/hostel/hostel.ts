import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-hostel',
  standalone: false,
  templateUrl: './hostel.html',
  styleUrl: './hostel.css'
})
export class Hostel {
  students: any[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  blocks: string[] = ['A', 'B', 'C', 'D'];
  selectedBlock: string = '';
  allocationForm: FormGroup;
selectedStudentId: number | null = null;
  roomNo: string = '';
  block: string = '';
  hostelFeeAmount: number = 10000;
  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) { this.students = this.dataService.getStudents();
    this.allocationForm = this.fb.group({
      studentId: [''],
      roomNo: [''],
      block: [''],
     
    });
    
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.dataService.getStudents();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          student.id.toString().includes(this.searchTerm);
      const matchesBlock = !this.selectedBlock || 
                          (student.hostel && student.hostel.block === this.selectedBlock);
      
      return matchesSearch && matchesBlock;
    });
  }

  allocateHostel() {
    if (this.selectedStudentId && this.roomNo && this.block) {
      this.dataService.allocateHostel(
        this.selectedStudentId,
        this.roomNo,
        this.block,
        this.hostelFeeAmount
      );
      alert('Hostel allocated successfully!');
      this.resetForm();
    }
  }

  private resetForm() {
    this.selectedStudentId = null;
    this.roomNo = '';
    this.block = '';
  }

  onDeallocate(student: Student): void {
    if (confirm('Are you sure you want to deallocate this student from hostel?')) {
      student.hostel = undefined;
      this.dataService.updateStudent(student);
      this.loadStudents();
    }
  }
 
}

