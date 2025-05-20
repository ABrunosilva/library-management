@Component({
  selector: 'app-card',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6 m-4">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {}