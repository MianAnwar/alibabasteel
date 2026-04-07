import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule, Factory, Award, Users, Clock, Shield, Package, MessageCircle } from 'lucide-angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  readonly FactoryIcon = Factory;
  readonly AwardIcon = Award;
  readonly UsersIcon = Users;
  readonly ClockIcon = Clock;
  readonly ShieldIcon = Shield;
  readonly PackageIcon = Package;
  readonly MessageCircleIcon = MessageCircle;

  readonly stats = [
    { value: '2,000+', label: 'Desks Delivered', icon: Package },
    { value: '8 yrs', label: 'In Steel Fabrication', icon: Factory },
    { value: '500+', label: 'Happy Clients', icon: Users },
    { value: '5–7 days', label: 'Average Lead Time', icon: Clock },
  ];

  readonly steps = [
    { n: '01', title: 'Material Procurement', desc: 'ASTM-grade mild steel sourced locally from certified Pakistani steel mills.' },
    { n: '02', title: 'CNC Cutting & Punching', desc: 'Precision CNC plasma and laser cutting to ±0.5 mm tolerance.' },
    { n: '03', title: 'MIG Welding', desc: 'Full-penetration MIG welds at all structural joints for load-bearing integrity.' },
    { n: '04', title: 'Grinding & Finishing', desc: 'All weld seams ground flush, followed by powder-coat or paint application.' },
    { n: '05', title: 'Quality Inspection', desc: 'Load-bearing and dimensional QC check before packing. Failed parts are reworked.' },
  ];
}

