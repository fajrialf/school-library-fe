import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MembersService } from './services/members.service';
import { Member } from './models/member.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-members',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
})
export class MembersComponent implements OnInit {
  members: Member[] | undefined;

  memberForm!: FormGroup;
  edit = false;
  editId!: number;
  constructor(private readonly memberService: MembersService) {}
  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }

  fetchData() {
    this.memberService.list().subscribe((res) => {
      this.members = res;
    });
  }

  buildForm(): void {
    this.memberForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(0, [Validators.required]),
    });
  }

  editForm(val: boolean) {
    this.edit = val;
    this.memberForm.reset();
  }

  submit() {
    if (this.editId) {
      this.memberService
        .update(this.editId, this.memberForm.value)
        .subscribe(() => {
          this.memberForm.reset();
          this.edit = false;
          this.fetchData();
        });
    } else {
      this.memberService.create(this.memberForm.value).subscribe(() => {
        this.memberForm.reset();
        this.edit = false;
        this.fetchData();
      });
    }
  }

  delete(id: number) {
    this.memberService.delete(id).subscribe(() => {
      this.fetchData();
    });
  }

  editMode(id: number) {
    this.memberService.get(id).subscribe((res) => {
      this.edit = true;
      this.memberForm.patchValue(res);
      this.editId = id;
    });
  }
}
