import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JWTGuard } from '@delon/auth';
import { AviatorFunctionComponent, AvaitorFunctionModule } from '@mt-insight-ng/insight';

const routes: Routes = [
  { path: 'aviator-function', canActivateChild: [JWTGuard], component: AviatorFunctionComponent, data: { reuse: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AvaitorFunctionModule],
  exports: [RouterModule],
})
export class FunctionRoutingModule {}
