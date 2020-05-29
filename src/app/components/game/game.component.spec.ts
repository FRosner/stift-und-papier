import {GameComponent} from '@src/app/components/game/game.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Player} from '@src/app/models/player';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render ownerless edges grey', () => {
    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual('#eee');
  });

  it('should render player edges with the respective color', () => {
    const player = new Player('test', 'blue');
    component.drawEdge(
        component.graph.edges.find(e => e.source.id === 0 && e.target.id === 1),
        player,
    );
    fixture.detectChanges();

    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual(player.color);
  });
});
